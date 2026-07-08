source "https://rubygems.org"

# Modern Jekyll stack for local development.
# GitHub Pages ignores Gemfile.lock and uses its own production versions,
# so this file is only for local builds. We keep plugins aligned with the
# site _config.yml.
gem "jekyll", "~> 4.3"
gem "minima", "~> 2.5"
gem "webrick"

# Jekyll plugins used by this site
# (mirror what github-pages provides, but at current patched versions)
group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-remote-theme"
  gem "jekyll-include-cache"
  gem "jekyll-sitemap"
  gem "jekyll-seo-tag"
  gem "jekyll-gist"
  gem "jekyll-redirect-from"
  gem "jekyll-mentions"
  gem "jemoji"
end

# Ruby 3.1+ / 4.0 compatibility shims for gems that still rely on
# previously standard-library packages.
gem "csv"
gem "logger"
gem "base64"
gem "ostruct"
gem "bigdecimal"
