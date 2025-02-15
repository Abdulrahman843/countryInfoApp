# CountryInfoApp

CountryInfoApp is a React Native application that allows users to explore country details, including population, capital, region, continent, country code, and current leadership (if available). The app also supports light and dark themes for an improved user experience.

## Features

1. Search for countries from a global list.

2. View detailed information about each country:
. Name
. Flag (image)
. Capital city
. Population
. Region
. Subregion
. Continent
. Country Code
. States/Provinces (if available)
. Current President (if available)
. Currency
. Languages

3. Light & Dark Mode Toggle.

4. Fully responsive UI.

5. Data fetched from the REST Countries API.

6. Deployment on Appetize.io for browser-based testing.

## Project Setup

1. Prerequisites

Ensure you have the following installed on your system:

Node.js (>=14.x)

npm or yarn

Expo CLI (npm install -g expo-cli)

Android Studio (for emulator testing) or a physical Android/iOS device

2. Clone the Repository

git clone https://github.com/Abdulrahman843/countryInfoApp.git
cd CountryInfoApp

3. Install Dependencies

npm install

OR

yarn install

4. Start the Development Server

npx expo start

This will launch the Expo Developer Tools. You can then:

Scan the QR code with Expo Go (Android/iOS) to test on a physical device.

Press a to run the app on an Android emulator.

Press w to run the app on a web browser.

## Running a Production Build

To create an APK (Android) or IPA (iOS) build for deployment, use:

eas build -p android --profile production

This will generate a downloadable APK or AAB file.

## Deploying to Appetize.io

To test the app online using Appetize.io:

Build the app

eas build -p android --profile preview

Upload the APK/AAB to Appetize.io

Visit https://appetize.io/upload

Upload the generated .apk file.

Share the provided testing link with users. Mine for this project is: https://appetize.io/embed/b_hgzbfyqxwtwzhoyjnewgjciuce

## Contributing

I welcome contributions! Follow these steps:

Fork the repository

Create a new branch (git checkout -b feature-branch)

Make your changes and commit (git commit -m "Added new feature")

Push to GitHub (git push origin feature-branch)

Open a Pull Request

## Technologies Used

React Native

Expo

TypeScript

REST Countries API

Appetize.io (for deployment)

## License

This project is open-source under the MIT License.

## Contact

For any inquiries, contact:

GitHub: https://github.com/Abdulrahman843

Email: energyspur@gmail.com


***Enjoy exploring the world with CountryInfoApp!***

