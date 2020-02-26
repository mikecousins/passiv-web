// hack to make routing work on both prod and dev
export const prefixPath = (path: string) => {
  return `/app${path}`;
};
