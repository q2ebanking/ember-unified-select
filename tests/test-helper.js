import resolver from './helpers/resolver';
import { setResolver } from 'ember-mocha';

import chai from 'chai';
import td from 'testdouble';
import tdChai from 'testdouble-chai';

chai.use(tdChai(td));

setResolver(resolver);

