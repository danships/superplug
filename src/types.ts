export type Options = {
  location: string;
  packageProperty?: string;
  requirePackageMain?: boolean;
};

export type InternalOptions = Options & {
  requirePackageMain: boolean;
  packageProperty: string;
};
