# Netease Profile

> A web app for visualizing personalized NeteaseMusic data

<img src="./prototype.png" width="70%"/>

Built with a bunch of things, but to name a few:

- NeteaseCloudMusicApi
- Styled Component
- @reach/router
- Storybook v5.3

# Setup

1. `git submodule update --init --recursive`
2. `yarn && yarn client:install && yarn server:install`
3. `yarn dev`

# Test

- `cd client && yarn storybook`
- `yarn test`

# Deploy

1. Create new heroku app

  ```bash
    herou create netease-profile
  ```

2. Push to heroku

  ```bash
    git push heroku master
  ```

3. Once the app is live on Heroku, hitting https://netease-profile.herokuapp.com/