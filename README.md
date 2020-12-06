# ReactBase
All course files for the event ReactBase - a React Firebase App on Project Collaboration Platform!

## About the event
---
ReactBase is a React Firebase event. Here we will be creating a Project Collaboration Platform wherein a team can keep a track of their tasks and which person is assigned to it.
It also comes with a Statistics page for each Workspace, to get a graphical representation of the data to help everyone understand better.

Check out the final build over [here](https://now-event-project-collab.web.app/)

## Instructions
---
> How to use this repository correctly? Follow the steps below:

- For each day of the event, a new branch will be created
  - For example: `Day 2(React-Basics)`
  - So that, if you missed any day's explanation then you can quickly come to this repository and check it out!
  
- After switching to a new branch, you are expected to read the `README.md` file first and then continuing with the source files.

- Wish to download the source files on your local pc and then try it? Check out the instructions for the same [here](#instructions)
  
- Found an error, or not getting how to solve the error? Create an issue [here](https://github.com/nowmozillaclub/ReactBase/issues/new/choose)


## Want to download the files from a particular branch?
---
- Click the green code button.
  ![Green Button](https://github.com/nowmozillaclub/ReactBase/blob/main/image2.png)
  
- Copy the URL
  - ![URL](https://github.com/nowmozillaclub/ReactBase/blob/main/image.png)
  
- Make a new directory on your file and open CMD over there
- Write `git clone urlYouCopied`
- Go into the directory you just **cloned** like `cd fileName`
- To switch to a particular day's branch do: `git checkout branchName`
  - To get the name of the branch, check the github!


## Running the code on your Local Device
---
- Download the repo, and switch branch if necessary to access that branch's code.
- Install all the dependencies using `npm install`
- Once that is done, start the React Server using `npm start`
- Yayzow! There you have it!
 
## Props

As React is a component based library which divides the UI into several components we might need to pass on some data from one component to another. This can be achieved by using **Props.**

Some key points:

- **Props**  is a special keyword in React, which stands for properties. Props are objects.
- Props are always passed in a uni-directional flow i.e from **Parent → Child**
- Props data is **Read Only**
- Props are like attributes of an HTML tag

    Ex.

    ```jsx
    <User firstName='Travis' lastName='Scott'/>
    ```

    In the above example, **firstName** and **lastName**  are the two props being passed onto the User component of the React App.

- The values passed on by using Props can be accessed in that component using **`this.props`**
- Props can be mapped to the local variables of that particular component.

Advantages:

- Makes components reusable as there are no hard coded values.
- Increases modularity

Example:

```jsx
import React, {Component} from 'react';

class Outter extends Component {
    render() {
        return(
            <div>
                <h3>User Details</h3>
                <User firstName='djhfsjhd' lastName='fjhjfhgjhdk' number={5345345}/>
            </div>
        );
    }
}

class User extends Component {
    render() {
        console.log(this.props.firstName);
        var {firstName, lastName, number} = this.props;
        return(
            <div>
                {/* <p>First Name: {firstName}</p> */}
                <p>First Name: {this.props.firstName}</p>
                {/* <p>Last Name: {lastName}</p> */}
                <p>Last Name: {this.props.lastName}</p>
                {/* <p>Number: {number}</p> */}
                <p>Number: {this.props.number}</p>
            </div>
        )
    }
}

export default Outter;
```

---

## Functional Components

Functional components as the name suggests are created using functions and they are also called as UI components.

A few key ponts: 

- They are more concerned with how the data is presented to the user.
- Functional components are stateless components i.e the do not have any state.
- State can be added to these components using a React Hook called useState.
- componentDidMount can be replaced by the React Hook called useEffect in functional components.
- They do not have any render method.

Syntax:

1. Using **function** keyword

```jsx
function Component1() {
    return(
        <div>
            <p>hello</p>
        </div>
    );
}
```

2. Using **arrow** function

```jsx
const Component2 = () => {
    return(
        <div>
            <p>lol</p>
        </div>
    )
}
```

---

## React Hooks

Hooks is a new addition to React which lets you use "**State"** and other React features without writing a class.

### 📌 UseState (State Hook)

This is the most used and basic "**Hook"** that react provides. We call it inside a function component to add a local state to it. This state will be preserved between between re-renders just like we discussed in the class based components.

Syntax:

```jsx
//Declaring a new state variable
const [varName, setVarName] = useState(0) 
//You can pass in the datatype of your choice, in this case we have initialized it with 0
```

Example: 

```jsx
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### ⚡️ UseEffect

You can think of useEffect Hook as componentDidMount, componentDidUpdate, and componentWillUnmount combined.

In many cases we want to perform the same side effect regardless of whether the component just mounted, or if it has been updated. Conceptually, we want it to happen after every render. UseEffect helps us to achieve that.

Syntax:

```jsx
useEffect(() => {
        effect
        return () => {
            cleanup
        }
    }, [input])
```

Example: 

```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### 💡Rules of Hooks

Hooks are JavaScript functions, but they impose two additional rules:

- Only call Hooks **at the top level**. Don’t call Hooks inside loops, conditions, or nested functions.
- Only call Hooks **from React function components**. Don’t call Hooks from regular class based components.