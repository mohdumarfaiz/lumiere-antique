import type { NextConfig } from 'next';

const [repositoryOwner, configuredRepositoryName] = process.env.GITHUB_REPOSITORY?.split('/') ?? [];
const repositoryName = configuredRepositoryName ?? 'lumiere-antique-site';
const githubPagesBuild = process.env.GITHUB_PAGES === 'true';
const hasCustomDomain = Boolean(process.env.CUSTOM_DOMAIN?.trim());
const isUserOrOrganizationSite = repositoryName === `${repositoryOwner}.github.io`;
const explicitBasePath = process.env.NEXT_PUBLIC_BASE_PATH;
const basePath = explicitBasePath !== undefined
  ? explicitBasePath.replace(/\/$/, '')
  : githubPagesBuild && !hasCustomDomain && !isUserOrOrganizationSite
    ? `/${repositoryName}`
    : '';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  // basePath prefixes Next's emitted assets too; a separate assetPrefix would double-prefix them.
  assetPrefix: undefined,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
};

export default nextConfig;
