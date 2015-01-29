# Should be run each time you wish to update your subtrees.

git subtree pull --prefix=local_subtree_modules/test_private_hapi_plugin    test_private_hapi_plugin    master --squash
git subtree pull --prefix=local_subtree_modules/test_private_library        test_private_library        master --squash
