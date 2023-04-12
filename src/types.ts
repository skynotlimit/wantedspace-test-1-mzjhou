export type AptClass =
  | 'team_name'
  | 'team_leader_promote'
  | 'team_leader_resign'
  | 'team'
  | 'position'
  | 'rank'
  | 'FIRST_JOINED'
  | 'WORKING'
  | 'ABSENCE'
  | 'RETIRED'
  | 'FULL_TIME_1'
  | 'INTERN_1'
  | 'IRREGULAR_1'
  | 'NOT_ASSIGNED'
  | 'PART_TIME_1';

export type EduClass =
  | 'GRADUATESCHOOL'
  | 'UNIVERSITY'
  | 'COLLEGE'
  | 'HIGHSCHOOL';

export type EduDegree =
  | 'GRADUATED'
  | 'PHD'
  | 'MASTER'
  | 'BACHELOR'
  | 'ATTENDING'
  | 'EXCHANGE'
  | 'LEAVE'
  | 'ABSENCE';

export type CaContract =
  | 'FULL_TIME_1'
  | 'INTERN_1'
  | 'IRREGULAR_1'
  | 'PART_TIME_1'
  | 'FREELANCER_1';

export interface PastCareer {
  ca_title: string;
  ca_content: string;
  ca_rank: string;
  ca_contract: CaContract;
  ca_start_date: string;
  ca_end_date: string;
  ca_date_type: string;
  order: number;
}

export interface Education {
  edu_title: string;
  edu_class: EduClass;
  edu_major: string;
  edu_start_date: string;
  edu_end_date: string;
  edu_degree: EduDegree;
  order: number;
}

export interface Appointment {
  apt_title: string;
  apt_team_name: string;
  apt_position: string;
  apt_rank_name: string;
  apt_class: AptClass;
  apt_memo: string;
  apt_datetime: string;
}
