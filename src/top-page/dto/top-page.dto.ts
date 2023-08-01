enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}

class HhData {
  count: number;
  juniorSalary: number;
  middleSalary: number;
  seniorSalary: number;
}

class TopPageAdvantage {
  title: string;
  description: string;
}

export class TopPageDto {
  firstCategory: TopLevelCategory;
  secondCategory: string;
  alias: string;
  title: string;
  category: string;
  hh?: HhData;
  advantages: TopPageAdvantage[];
  seoText: string;
  tagsTitle: string;
  tags: string[];
}
