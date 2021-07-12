# Overview

This is a service to search for 音MADs.

It allows you to set filters for the search results.

~~It calls the [niconico Content Search API](https://site.nicovideo.jp/search-api-docs/search.html) behind the scenes.~~

- [Deprecated and removed](https://blog.nicovideo.jp/niconews/143630.html)

It calls the [niconico Snapshot Search API](https://site.nicovideo.jp/search-api-docs/snapshot) behind the scenes.

You are limited pages that can be viewed because of the API specifications (page view which is updated once a day).

## Parameter Description

Parameters that can have both the minimum and maximum set can also have only one of them set.

### Sort

You can select the sort order.

Sorting by popularity is not possible.

### Number of My Lists

Search in the range of the specified number of My Lists.

### Duration

Search within the specified video duration.

### Views

Search in the range of the specified number of Views.

### Date Range

Search in the range of the dates specified.

## Credits

- [@\_naari\_](https://twitter.com/_naari_): Development, maintenance
- [@readybug\_](https://twitter.com/readybug_): Logo design
- [@stysmmaker](https://github.com/stysmmaker) Introduce to i18n, English translation
