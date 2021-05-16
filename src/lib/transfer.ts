import got from 'got';
import cheerio from 'cheerio';
import pThrottle from 'p-throttle';
import {ITransferCourse} from './types';
import {protectNaN} from './utils';

const getAllTransferCourses = async (): Promise<ITransferCourse[]> => {
  const {body, url} = await got('https://www.banweb.mtu.edu/owassb/mtu_transfer_detail.P_TRNS_STATE');

  if (url.includes('down')) {
    // Banner services are down
    throw new Error('Banner services are currently down.');
  }

  const $ = cheerio.load(body);

  const states: string[] = [];

  $('select[name=state_code] option').each((_, element) => {
    states.push($(element).attr('value')?.trim() ?? '');
  });

  const throttledGotPost = pThrottle({limit: 2, interval: 512})(got.post) as unknown as typeof got.post;

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

      let theseCourses: ITransferCourse[] = [];

      table.children().each((i, row) => {
        // Skip header
        if ([0, 1].includes(i)) {
          return;
        }

        const r = $(row);

        theseCourses.push({
          from: {
            college: collegeName,
            state,
            subject: r.find('td:nth-child(1)').text(),
            crse: r.find('td:nth-child(2)').text(),
            credits: protectNaN(parseInt(r.find('td:nth-child(3)').text(), 10))
          },
          to: {
            title: r.find('td:nth-child(4)').text(),
            subject: r.find('td:nth-child(5)').text(),
            crse: r.find('td:nth-child(6)').text(),
            credits: protectNaN(parseInt(r.find('td:nth-child(7)').text(), 10))
          }
        });
      });

      // Some courses can be transfered as two different things
      theseCourses = theseCourses.map((course, i) => {
        if (course.from.subject === '' && i > 0) {
          for (let j = i - 1; j >= 0; j--) {
            const maybeDefinedCourse = theseCourses[j];

            if (maybeDefinedCourse.from.subject !== '') {
              return {from: maybeDefinedCourse.from, to: course.to};
            }
          }
        }

        return course;
      });

      courses.push(...theseCourses);
    }));
  }));

  return courses;
};

export {getAllTransferCourses};
