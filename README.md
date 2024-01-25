
# Nest JS E Commerce API


## Testing with the deployed development environment on AWS.
Authentication APIs can be accessed through the API Gateway URL for Auth.
https://gyeene0qw4.execute-api.ap-south-1.amazonaws.com/dev
User and preferences APIs can be accessed through the API Gateway URL.
https://0us2iyb4pi.execute-api.ap-south-1.amazonaws.com/dev

The Nest JS E-Commerce Preferences API is designed to efficiently handle user preferences, providing functionalities for both addition and deletion operations. This API empowers your E-Commerce platform to seamlessly manage user-specific preferences, enhancing the overall user experience.

## Screenshots

![App Screenshot](https://i.imgur.com/ReyWTMP.png)

## Overview
This repository contains two projects: `nestjs-proj` and `nestjs-proj-auth`. The former is a NestJS application, while the latter focuses on authentication using AWS Cognito. Additionally, a separate Terraform project, `nest-proj-terraform`, is provided to set up the necessary AWS Cognito User Pool.
This project utilizes two API gateways. One is responsible for handling authentication through Cognito and Lambda functions, while the other manages user-related functionalities and preferences.

## Getting Started

### 1. Clone Repositories

Clone the following repositories:

```bash
git clone https://github.com/DinoXR/nestjs-proj.git
git clone https://github.com/DinoXR/nestjs-proj-auth.git
git clone https://github.com/DinoXR/nest-proj-terraform.git
```
### 2. Terraform Setup

Navigate to the nest-proj-terraform directory and follow these steps:
```bash
cd nest-proj-terraform
```

Download the Terraform files and initialize:

```bash
terraform init
```


Apply the configuration to create the AWS Cognito User Pool:


### 3. NestJS Projects

a. nestjs-proj

Navigate to the nestjs-proj directory:
```bash
cd nestjs-proj
```

b. nestjs-proj-auth

Navigate to the nestjs-proj-auth directory:

```bash
cd nestjs-proj-auth
```

### 4. Deployment and Local Development
Each project comes with a Makefile to simplify deployment and local development.

a. nestjs-proj
Navigate to the nestjs-proj directory:
```bash
cd nestjs-proj
```

Use the Makefile to deploy or run locally:

```bash
make deploy  # Deploy using serverless framework
make build     # Run locally
```

b. nestjs-proj-auth
Navigate to the nestjs-proj-auth directory:

```bash
cd nestjs-proj-auth
```

Use the Makefile to deploy or run locally:

```bash
make deploy  # Deploy using serverless framework
make build     # Run locally
```


## Demo

### 1 First Register As User
![App Screenshot](https://i.imgur.com/Z1eQCkY.png)

Once created you will receive an OTP to the registered email to confirm the email and that will approve your account

### 2 Confirming the account
![App Screenshot](https://i.imgur.com/zqEoWzi.png)

Once you confirm your account by entering the OTP that came to your email,  you can Login

### 3 Login 
![App Screenshot](https://i.imgur.com/mmLJ9mk.png)

### 4 Use the ID token to manage the Preferences
![App Screenshot](https://i.imgur.com/I8azNYi.png)

