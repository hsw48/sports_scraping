To run the backend:
- Make sure you have node version 18.14.0 installed. If you have a different version of node installed, we recommend using the nvm node package manager to switch versions.
- npm install .
- Add an AWS configuration profile to your local environment via "aws configure --profile {YOUR_PROFILE_NAME}"
  - Please see this resource to do so: https://docs.aws.amazon.com/cli/latest/reference/configure/#:~:text=You%20can%20configure%20a%20named,when%20prompted%20for%20the%20value.
  - As a reminder you will need to use your own personal AWS account. If you do not have one, it is easy to create using your personal email. It should not require any credit card information to get started.
- AWS_PROFILE={YOUR_PROFILE_NAME} npx sst start --stage prod-0-0-1
- The first time this runs it may take a minute or two to deploy your cloudformation stack to the cloud. The service we use to do so is called sst.dev. Feel free to visit their website to learn more!
- The api domain information is logged to the console and this is the base URL you will use to interact with your api!