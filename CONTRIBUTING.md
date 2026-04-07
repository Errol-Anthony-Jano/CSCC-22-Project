# Contributing Guidelines

## First Contributions
When you are yet to contribute to the repository, please clone the repository locally first. 

## Subsequent Contributions
When adding new contributions, do NOT make changes on the main branch. Always create a branch first via git checkout -b branch-name.
Here is the preferred workflow for integrating changes into the main branch for every new change.

1. Pull from the remote repository for the latest changes before creating a new branch.
2. Create a new branch and name it appropriately based on the changes you're making, via git checkout -b branch-name.
3. Create your changes, add the modified files to the staging area, and then commit the changes. 
4. When ready to push, switch to the main branch using git checkout main.
5. Verify that you are already within the main branch via git branch. When verified, merge the changes of the feature branch you created with the main branch via git merge branch-name.
6. Push the changes to remote via git pull origin main.
