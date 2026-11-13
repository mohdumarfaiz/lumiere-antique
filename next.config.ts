import type { NextConfig } from 'next';

const [repositoryOwner, configuredRepositoryName] = process.env.GITHUB_REPOSITORY?.split('/') ?? [];
const repositoryName = configuredRepositoryName ?? 'lumiere-antique-site';
const githubPagesBuild = process.env.GITHUB_PAGES === 'true';
const customDomain = process.env.CUSTOM_DOMAIN?.trim();
const siteHost = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL ?? '').hostname;
  } catch {
    return '';
  }
})();
const hasCustomSiteUrl = Boolean(siteHost && siteHost !== 'localhost' && siteHost !== '127.0.0.1' && siteHost !== 'github.io' && !siteHost.endsWith('.github.io'));
const hasCustomDomain = Boolean(customDomain) || (githubPagesBuild && hasCustomSiteUrl);
const isUserOrOrganizationSite = repositoryName === `${repositoryOwner}.github.io`;
const explicitBasePath = process.env.NEXT_PUBLIC_BASE_PATH;
const normalizedExplicitBasePath = explicitBasePath
  ? `/${explicitBasePath.replace(/^\/+|\/+$/g, '')}`
  : '';
const basePath = githubPagesBuild && hasCustomDomain
  ? ''
  : explicitBasePath !== undefined
    ? normalizedExplicitBasePath
    : githubPagesBuild && !isUserOrOrganizationSite
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
