# Stopwatch Application

## Branches

### Main Branch

The main branch is the original code provided placed in the index.tsx file, of an application that was quickly spun up using [Create React App](https://github.com/facebook/create-react-app) with Typescript.

The following issue where found in the code:

- ClassAttributes isn't need, unless we are going to access the components ref
- laps should be initialized in the constructor, and incrementer should be initialized in the state
- All of the handle... aren't boud to this class which will, cause an runtime errors when the classes are invoked.
- handleDeleteClick is missing the closing bracket, which will cause a sytx error
- render method is missing the closing bracket, which will cause a syntax error
- The return statement is outside of the render method, which will cause a syntax error
- The use if any type does defeat the purpose of using TypeScript

### Basic Improvments Branch

The basic improvemnts branch is just making the base improvemnts to get the code to run properly without any improvemnts to the application.

The following improvements have been made to the code:

- Create a StopwatchState interface to define the state of the Stopwatch component and added laps to the state
- Bound all the methods in the constructor to the class instance
- Added a type to the onDelete prop in the Lap component
- Corrected all of the syntex errors in the code
- Removed the use of any and replaced it with the correct types

### Optimization Branch

The opimization branch rewrites the application, addes improvements and some basic styling.

The followinf improvements to have been made to the code:

- Created component files for Stopwatch and Lap
- Created a utils folder for formatting functions and types files
- Converted from class component to a functional component, the reson for this is personal preference, simplicity.
- Updated to more modern React implementation, such as using hooks instead of constructor, super(props) and this.setState, etc.
- Created a LapProp interface
- Deconstructed props in the componet, this was mainly my preference for how to use props.
- Added some styling to make this look nicer

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
