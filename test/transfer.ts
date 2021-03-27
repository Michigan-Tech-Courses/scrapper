import test from 'ava';
import fs from 'fs';
import nock from 'nock';
import td from 'testdouble';
import * as constants from './helpers/constants';

td.replace('../src/lib/constants', constants);

import {getAllTransferCourses} from '../src';

test('getAllTransferCourses() works correctly', async t => {
  nock('https://www.banweb.mtu.edu')
    .get('/owassb/mtu_transfer_detail.P_TRNS_STATE')
    .reply(200, await fs.promises.readFile('./test/resources/transfer-states.html'));

  nock('https://www.banweb.mtu.edu')
    .post('/owassb/mtu_transfer_detail.P_TRNS_SCHOOL')
    .reply(200, await fs.promises.readFile('./test/resources/transfer-colleges.html'));

  nock('https://www.banweb.mtu.edu')
    .post('/owassb/mtu_transfer_detail.P_TRNS_FULL')
    .reply(200, await fs.promises.readFile('./test/resources/transfer-courses.html'));

  const courses = await getAllTransferCourses();

  t.snapshot(courses);
});
