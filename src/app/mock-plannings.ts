import { Planning } from './planning';
import { Activity } from './activity';
import { Creneau } from './creneau';
import { MemberService } from './member.service';

import * as moment from 'moment';
import 'moment/locale/fr';

let plannings = [];

// for (let i = -100; i < 366; ++i) {
//     plannings.push(new Planning(i));
// }

export const PLANNINGS: Planning[] = plannings;
