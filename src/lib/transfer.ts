import got from 'got';
import cheerio from 'cheerio';
import pThrottle from 'p-throttle';
import {ITransferCourse} from './types';

const getAllTransferCourses = async (): Promise<ITransferCourse[]> => {
  const {body} = await got('https://www.banweb.mtu.edu/owassb/mtu_transfer_detail.P_TRNS_STATE');

  const $ = cheerio.load(body);

  const states: string[] = [];

  $('select[name=state_code] option').each((_, element) => {
    states.push($(element).attr('value')?.trim() ?? '');
  });

  const throttledGotPost = pThrottle({limit: 4, interval: 264})(got.post) as unknown as typeof got.post;

  const courses: ITransferCourse[] = [];

  await Promise.all(states.map(async state => {
    const {body} = await throttledGotPost('https://www.banweb.mtu.edu/owassb/mtu_transfer_detail.P_TRNS_SCHOOL', {
      form: {
        state_code: state
      }
    });

    const $ = cheerio.load(body);

    const colleges: string[] = [];

    $('select[name=SBGI_CODE] option').each((_, element) => {
      colleges.push($(element).attr('value')?.trim() ?? '');
    });

    await Promise.all(colleges.map(async college => {
      const {body} = await throttledGotPost('https://www.banweb.mtu.edu/owassb/mtu_transfer_detail.P_TRNS_FULL', {
        form: {
          SBGI_CODE: college,
          state
        }
      });

      const $ = cheerio.load(body);

      const table = $('table[cellspacing=3] tbody');

      const collegeName = table.find('tr:first-child td:first-child').text().trim();

      table.children().each((i, row) => {
        // Skip header
        if (i === 0) {
          return;
        }

        const r = $(row);

        courses.push({
          from: {
            college: collegeName,
            subject: r.find('td:nth-child(1)').text(),
            crse: r.find('td:nth-child(2)').text(),
            credits: parseInt(r.find('td:nth-child(3)').text(), 10)
          },
          to: {
            title: r.find('td:nth-child(4)').text(),
            subject: r.find('td:nth-child(5)').text(),
            crse: r.find('td:nth-child(6)').text(),
            credits: parseInt(r.find('td:nth-child(7)').text(), 10)
          }
        });
      });
    }));
  }));

  return courses;
};

export {getAllTransferCourses};
