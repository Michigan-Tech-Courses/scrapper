import test from 'ava';
import fs from 'fs';
import nock from 'nock';
import td from 'testdouble';
import * as constants from './helpers/constants';

td.replace('../src/lib/constants', constants);

import courses from '../src';
import {getAllFacultyByDepartment} from '../src/lib/faculty';

// Test('parses courses', async t => {
//   const offered = await courses.get();
//   console.log(JSON.stringify(offered))
// 	t.pass();
// });

test('getSectionDetails() works correctly', async t => {
  const options = {term: '202008', subject: 'CS', crse: '123', crn: '123'};

  const response = await fs.promises.readFile('./test/resources/section.html');
  nock('https://www.banweb.mtu.edu')
    .get('/owassb/bwckschd.p_disp_listcrse')
    .query({
      term_in: options.term,
      subj_in: options.subject,
      crse_in: options.crse,
      crn_in: options.crn
    })
    .reply(200, response);

  const section = await courses.getSectionDetails(options);

  t.snapshot(section);
});

// Details with multiple instructors

test('getSectionDetails() throws if section doesn\'t exist', async t => {
  const options = {term: '202008', subject: 'CS', crse: '123', crn: '123'};

  const response = await fs.promises.readFile('./test/resources/section-not-found.html');
  nock('https://www.banweb.mtu.edu')
    .get('/owassb/bwckschd.p_disp_listcrse')
    .query({
      term_in: options.term,
      subj_in: options.subject,
      crse_in: options.crse,
      crn_in: options.crn
    })
    .reply(200, response);

  await t.throwsAsync(async () => courses.getSectionDetails(options), {message: 'Course not found'});
});

test('get faculty', async t => {
  nock('https://www.mtu.edu')
    .get('/cs/department/people/')
    .reply(200, await fs.promises.readFile('./test/resources/cs-faculty.html'))

    .get('/chemistry/people-groups/faculty-staff/')
    .reply(200, await fs.promises.readFile('./test/resources/chemistry-faculty.html'));

  const people = await getAllFacultyByDepartment();

  t.snapshot(people);
});
