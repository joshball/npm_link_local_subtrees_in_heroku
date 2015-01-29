# npm_link_local_subtrees_in_heroku
An example node project that uses git subtrees for private modules and attempts to link or install locally these modules in heroku.

# The problem.
How do you handle private modules in heroku when you DO NOT want heroku to have access to your servers. For instance, if your
repo is behind a firewall, and Ops would laugh you out of the room if you asked for an exception. ;-)

Further, what if you had multiple repos that were private, and they had dependencies on each other.


# The Components

## npm_link_local_subtrees_in_heroku (git@github.com:joshball/npm_link_local_subtrees_in_heroku.git)
This is a hapi server. (main.js). The repo is publicly available.

## test_private_hapi_plugin (ssh://git@bitbucket.org:joshuaball/test_private_hapi_plugin.git)
This is a hapi plugin that has a repo that is not accessible to the public

## test_private_library (ssh://git@bitbucket.org:joshuaball/test_private_library.git)
This is a library used by test_private_hapi_plugin. It is also private.

# Server functionality
The server loads the private plugin that provides a /status route. The status route returns:
    {
        date: CURRENT_DATE,
        pluginVersion: PRIVATE_PLUGIN_PACKAGEJSON_VERSION,
        libraryVersion: PRIVATE_LIBRARY_PACKAGEJSON_VERSION
    }

# How you can setup and install


# How I setup and install.
1. First I created the three repos


# Notes

## If a package.json has a repo reference
package.json: "test_private_hapi_plugin": "git+ssh://git@bitbucket.org:joshuaball/test_private_hapi_plugin.git"

### every npm install will refetch the repo.
1. If you have v1.0.0 installed
2. and the repo is updated to v1.0.1
3. and you run npm install
4. You will get v1.0.1

    {
      "name": "npm_link_local_subtrees_in_heroku",
      "version": "1.0.0",
      "dependencies": {
        "test_private_hapi_plugin": {
          "version": "1.0.2",
          "from": "C:\\Users\\Joshua\\AppData\\Local\\Temp\\npm-12724-33777594\\git-cache-77fb936df16f\\bb412461290c73b8a4a7ac70f850e55377724f1d",
          "resolved": "git+ssh://git@bitbucket.org:joshuaball/test_private_hapi_plugin.git#bb412461290c73b8a4a7ac70f850e55377724f1d",
          "dependencies": {
            "test_private_library": {
              "version": "2.2.1",
              "from": "C:\\Users\\Joshua\\AppData\\Local\\Temp\\npm-12724-33777594\\git-cache-c59d450f2180\\e4c31873bf59c8b7e2513f74c6549daba7380daa",
              "resolved": "git+ssh://git@bitbucket.org:joshuaball/test_private_library.git#e4c31873bf59c8b7e2513f74c6549daba7380daa"
            }
          }
        }
      }
    }



### If the repo reference is not accessible (for instance without ssh):
    "test_private_hapi_plugin": "git://git@bitbucket.org:joshuaball/test_private_hapi_plugin.git"

Then npm install will fail:

    npm WARN `git config --get remote.origin.url` returned wrong result (git://git@bitbucket.org/joshuaball/test_private_hapi_plugin.git)
    npm ERR! git clone git://git@bitbucket.org/joshuaball/test_private_hapi_plugin.git Cloning into bare repository 'X:\CACHE\npm\_git-remotes\git-git-bitbucket-org-joshuaball-test-private-hapi-plugin-git-64261cba'...

### If the sub repo reference is not accessible (for instance without ssh):
    node_modules/test_private_hapi_plugin/package.json:
        "test_private_library": "git://git@bitbucket.org:joshuaball/test_private_library.git"

The we also fail, but a bit differently:

    npm ERR! git clone git://git@bitbucket.org/joshuaball/test_private_library.git Cloning into bare repository 'X:\CACHE\npm\_git-remotes\git-git-bitbucket-org-joshuaball-test-private-library-git-0a5475dd'...
    npm ERR! git clone git://git@bitbucket.org/joshuaball/test_private_library.git fatal: Unable to look up git@bitbucket.org (port 9418) (A non-recoverable error occurred during a database lookup. )

# Now lets add some subtrees:
