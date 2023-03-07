---
layout: page
title: "Recon-ng"
permalink: /recon-ng
---
<link rel="shortcut icon" type="image/x-icon" href="favicon.ico">
Some asked about the modules used for Recon-ng. Here is a list of modules I have set up and modules that I used in the exercises. These aren't so much endorsements or a list of the best modules as much as they are some of the modules I use that use services that are cheap or free.

#### Appendix
[Recon-ng Module List](https://hackertarget.com/recon-ng-tutorial/) | [Recong-ng API Setup Guide](https://github.com/Raikia/Recon-NG-API-Key-Creation/blob/master/README-v4.8.3.md)

#### Example Modules Used in our Exercises:

    recon/companies-contacts/censys_email_address
    recon/companies-domains/censys_subdomains
    recon/companies-multi/censys_org
    recon/companies-multi/censys_tls_subjects
    recon/contacts-domains/censys_email_to_domains
    recon/domains-companies/censys_companies
    recon/domains-hosts/censys_domain
    recon/hosts-hosts/censys_query
    recon/hosts-ports/censys_hostname
    recon/hosts-ports/censys_ip
    recon/netblocks-companies/censys_netblock_company
    recon/netblocks-hosts/censys_netblock


#### recon-ng > modules search

  Discovery
  ---------

    discovery/info_disclosure/cache_snoop
    discovery/info_disclosure/interesting_files

  Import
  ------

    import/csv_file
    import/list
    import/masscan
    import/nmap

  Recon
  -----

    recon/companies-contacts/bing_linkedin_cache
    recon/companies-contacts/censys_email_address
    recon/companies-contacts/pen
    recon/companies-domains/censys_subdomains
    recon/companies-domains/pen
    recon/companies-domains/viewdns_reverse_whois
    recon/companies-domains/whoxy_dns
    recon/companies-multi/censys_org
    recon/companies-multi/censys_tls_subjects
    recon/companies-multi/github_miner
    recon/companies-multi/shodan_org
    recon/companies-multi/whois_miner
    recon/contacts-contacts/abc
    recon/contacts-contacts/mailtester
    recon/contacts-contacts/mangle
    recon/contacts-contacts/unmangle
    recon/contacts-domains/censys_email_to_domains
    recon/contacts-domains/migrate_contacts
    recon/contacts-profiles/fullcontact
    recon/credentials-credentials/adobe
    recon/credentials-credentials/bozocrack
    recon/domains-companies/censys_companies
    recon/domains-companies/pen
    recon/domains-companies/whoxy_whois
    recon/domains-contacts/hunter_io
    recon/domains-contacts/pen
    recon/domains-contacts/pgp_search
    recon/domains-contacts/whois_pocs
    recon/domains-contacts/wikileaker
    recon/domains-domains/brute_suffix
    recon/domains-hosts/bing_domain_api
    recon/domains-hosts/bing_domain_web
    recon/domains-hosts/brute_hosts
    recon/domains-hosts/censys_domain
    recon/domains-hosts/certificate_transparency
    recon/domains-hosts/google_site_web
    recon/domains-hosts/hackertarget
    recon/domains-hosts/mx_spf_ip
    recon/domains-hosts/netcraft
    recon/domains-hosts/shodan_hostname
    recon/domains-hosts/ssl_san
    recon/domains-hosts/threatcrowd
    recon/domains-hosts/threatminer
    recon/domains-vulnerabilities/ghdb
    recon/domains-vulnerabilities/xssed
    recon/hosts-domains/migrate_hosts
    recon/hosts-hosts/bing_ip
    recon/hosts-hosts/censys_query
    recon/hosts-hosts/ipinfodb
    recon/hosts-hosts/ipstack
    recon/hosts-hosts/resolve
    recon/hosts-hosts/reverse_resolve
    recon/hosts-hosts/ssltools
    recon/hosts-hosts/virustotal
    recon/hosts-locations/migrate_hosts
    recon/hosts-ports/censys_hostname
    recon/hosts-ports/censys_ip
    recon/hosts-ports/shodan_ip
    recon/locations-locations/geocode
    recon/locations-locations/reverse_geocode
    recon/locations-pushpins/shodan
    recon/locations-pushpins/twitter
    recon/locations-pushpins/youtube
    recon/netblocks-companies/censys_netblock_company
    recon/netblocks-companies/whois_orgs
    recon/netblocks-hosts/censys_netblock
    recon/netblocks-hosts/reverse_resolve
    recon/netblocks-hosts/shodan_net
    recon/netblocks-hosts/virustotal
    recon/netblocks-ports/census_2012
    recon/profiles-contacts/bing_linkedin_contacts
    recon/profiles-contacts/dev_diver
    recon/profiles-contacts/github_users
    recon/profiles-profiles/profiler
    recon/profiles-profiles/twitter_mentioned
    recon/profiles-profiles/twitter_mentions
    recon/profiles-repositories/github_repos
    recon/repositories-profiles/github_commits
    recon/repositories-vulnerabilities/gists_search
    recon/repositories-vulnerabilities/github_dorks

  Reporting
  ---------

    reporting/csv
    reporting/html
    reporting/json
    reporting/list
    reporting/proxifier
    reporting/pushpin
    reporting/xlsx
    reporting/xml

#### View the Marketplace
  D = Has dependencies. See info for details.
  K = Requires keys. See info for details.
![[Pasted image 20230207163100.png]]
