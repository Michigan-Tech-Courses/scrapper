import got from 'got/dist/source';
import pLimit from 'p-limit';
import cheerio from 'cheerio';
import {FACULTY_PAGES} from './constants';
import {IFaculty} from './types';
import {removeEmptyElements, resolvePartialURL, trim} from './utils';

interface IDepartmentAndPeople {
  department: string;
  people: IFaculty[];
}

export const getAllFacultyByDepartment = async (): Promise<IDepartmentAndPeople[]> => {
  const limit = pLimit(3);

  const scrappedPages = await Promise.all(FACULTY_PAGES.map(pageURL => limit(async () => {
    const {body} = await got.get(pageURL);

    const $ = cheerio.load(body);

    const department = trim($('.sitetitle span > a').text());

    const people: IFaculty[] = [];

    $('.person').each((_, element) => {
      const node = $(element);

      const name = trim(node.find('.personal > h2').text());

      const occupations = node.find('.personal > ul li').toArray().map(occupation => trim($(occupation).text()));

      const email = trim(node.find('.left > .contact .email-address > a').text());

      const phone = trim(node.find('.left > .contact .phone-number > a').text());

      const office = trim(node.find('.left > .contact .place').text());

      const websiteURL = node.find('.left.specialties > ul > li > a:contains("Faculty")').attr('href');

      const photoURL = node.find('img').attr('src');

      const interestsParent = node.find('.right.specialties > ul li').toArray().length > 0 ? node.find('.right.specialties > ul li') : node.find('.right .specialties > ul li');

      const interests = interestsParent.toArray().map(interest => trim($(interest).text()));

      people.push({
        name,
        occupations: removeEmptyElements(occupations),
        email: email === '' ? null : email,
        phone: phone === '' ? null : phone,
        office: office === '' ? null : office,
        websiteURL: websiteURL ? resolvePartialURL(websiteURL) : null,
        photoURL: photoURL ? resolvePartialURL(photoURL) : null,
        interests: removeEmptyElements(interests)
      });
    });

    return {
      department,
      people
    };
  })));

  return ([] as IDepartmentAndPeople[]).concat(...scrappedPages);
};
