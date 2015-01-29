## This should only be run once to establish the subtree.

git subtree add --prefix=local_subtree_modules/test_private_hapi_plugin     test_private_hapi_plugin    master --squash
git subtree add --prefix=local_subtree_modules/test_private_library         test_private_library        master --squash
