// hack to make routing work on both prod and dev
export const prefixPath = (path: string) => {
  return `/app${path}`;
};

export const restrictionTypes = [
  {
    id: 'RETAIN_MIN',
    name: 'Retain at least',
    description: 'Keep at least this amount of cash in your account',
  },
  {
    id: 'ALLOCATE_MAX',
    name: 'Allocate at most',
    description: 'Use at most this much cash when purchasing assets',
  },
];

export const Truncate = (name: string, truncateBy: number) => {
  let truncatedName = name;
  if (name.length > truncateBy) {
    truncatedName = name.slice(0, truncateBy) + '...';
  }
  return truncatedName;
};
