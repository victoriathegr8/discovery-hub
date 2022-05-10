import { render, screen, waitFor } from '@testing-library/react';
import { Createform } from '../registerOrg';
import { initializeApp } from "firebase/app";
import userEvent from '@testing-library/user-event';
import { MockDatabase, MockRef } from '../setupTests';

initializeApp();
let getBase64 = require('get-base64');

describe('The form', () => {
  test('shows the form title', () => {
    render(<Createform />);
    expect(screen.getByText("Register Your Organization")).toBeInTheDocument();
  });

  test('shows no error if a name is entered', () => {
    render(<Createform />); //render into testing DOM!

    const formInput = screen.getByPlaceholderText('Enter Name');
    userEvent.type(formInput, "WINFO");

    clickDoneButton();

    expect(document.getElementById("nameValidationMsg").innerHTML).toBe("&nbsp;");
  })

  test('shows no error if valid email is entered', () => {
    render(<Createform />); //render into testing DOM!

    const formInput = screen.getByPlaceholderText('Enter Email Address');
    userEvent.type(formInput, "hello@email.com");
    clickDoneButton();

    expect(document.getElementById("emailValidationMsg").innerHTML).toBe("&nbsp;");
  })

  test('shows no error if bio is typed in', () => {
    render(<Createform />); //render into testing DOM!
    typeInput("bio", "Enter Bio Here");
    clickDoneButton();

    expect(document.getElementById("bioValidationMsg").innerHTML).toBe("&nbsp;");
  })

  test('shows no error if at least one service is checked', () => {
    render(<Createform />); //render into testing DOM!

    const mentorCheckBox = document.querySelector('#mentorCheckbox');

    userEvent.click(mentorCheckBox);
    clickDoneButton();

    expect(document.getElementById("servicesValidationMsg").innerHTML).toBe("&nbsp;");
  });

  test('shows no error if at least one subject is checked', () => {
    render(<Createform />); //render into testing DOM!

    const writingCheckBox = document.querySelector('#writingCheckbox');

    userEvent.click(writingCheckBox);
    clickDoneButton();

    expect(document.getElementById("subjectsValidationMsg").innerHTML).toBe("&nbsp;");
  });

  test('shows no error if at least one platform is checked', () => {
    render(<Createform />); //render into testing DOM!

    const inPersonCheckbox = document.querySelector('#inPersonCheckbox');

    userEvent.click(inPersonCheckbox);
    clickDoneButton();

    expect(document.getElementById("platformsValidationMsg").innerHTML).toBe("&nbsp;");
  });

  test('shows no error if valid website is entered', () => {
    render(<Createform />); //render into testing DOM!

    const formInput = screen.getByPlaceholderText('Enter Website');
    userEvent.type(formInput, "hello.com");
    clickDoneButton();

    expect(document.getElementById("websiteValidationMsg").innerHTML).toBe("&nbsp;");
  })
});

describe('Profile picture tests ', () => {
  test('shows error if no picture is inputted', () => {
    render(<Createform />);
    clickDoneButton();

    expect(screen.getByText("Please upload a profile picture")).toBeInTheDocument();
  });

  test('shows error if profile picture uploaded is larger than 1 MB', () => {
    render(<Createform />);
    const fileInput = document.querySelector("#registerFileUpload");
    const file = new File([""], 'someorg.png');
    Object.defineProperty(file, 'size', { value: 1024 * 1024 + 1 })

    userEvent.upload(fileInput, file);
    clickDoneButton();
    // test should pass and youshould get uploadPhoto method called
    expect(document.getElementById("pictureValidationMsg").innerHTML).toBe("Please upload a profile picture smaller than 1 MB");
  });

  test('shows no error if profile picture uploaded is valid', () => {
    render(<Createform />);
    const fileInput = document.querySelector("#registerFileUpload");
    const file = new File([""], 'smallorg.png');
    Object.defineProperty(file, 'size', { value: 1 })

    userEvent.upload(fileInput, file);
    waitFor(() => expect(getBase64).toHaveBeenCalledTimes(1));
    clickDoneButton();
    // test should pass and you should get uploadPhoto method called
    expect(document.getElementById("pictureValidationMsg").innerHTML).toBe("&nbsp;");
  });
});

describe('City tests', () => {
  test('shows error if no city is selected', () => {
    render(<Createform />); //render into testing DOM!
    clickDoneButton();

    expect(screen.getByText("Please select a city")).toBeInTheDocument();
  })

  test('shows no error if a city is selected', () => {
    render(<Createform />); //render into testing DOM!

    const cityDropdown = document.querySelector('.selectCity');
    userEvent.click(cityDropdown);
    userEvent.selectOptions(screen.getByTestId('testSelectCity'), ['Seattle']);
    clickDoneButton();
    expect(document.getElementById("cityValidationMsg").innerHTML).toBe('&nbsp;');
  })
});

describe('The modal should close', () => {
  test('upon clicking the X button', () => {
    render(<Createform />); //render into testing DOM!

    const closeModalButton = document.querySelector("#addModalClose")
    userEvent.click(closeModalButton);

    expect(document.getElementById("addModal").style.display).toBe("none");
  });

  test('upon clicking outside the modal', () => {
    render(<Createform />); //render into testing DOM!

    const notCloseModalButton = document.querySelector('#addModal');;
    userEvent.click(notCloseModalButton)

    expect(document.getElementById("addModal").style.display).toBe("none");
  });
});

describe('Inputting all valid inputs should', () => {
  test('add a new object to the Firebase', () => {
    render(<Createform />);
    typeInput("WINFO", "Enter Name");
    typeInput("hello@email.com", "Enter Email Address");
    typeInput("bio", "Enter Bio Here");
    const mentorCheckBox = document.querySelector('#mentorCheckbox');
    userEvent.click(mentorCheckBox);
    const writingCheckBox = document.querySelector('#writingCheckbox');
    userEvent.click(writingCheckBox);
    const inPersonCheckbox = document.querySelector('#inPersonCheckbox');
    userEvent.click(inPersonCheckbox);
    typeInput("website.com", "Enter Website");
    const fileInput = document.querySelector("#registerFileUpload");
    const file = new File([""], 'someorg.png');
    Object.defineProperty(file, 'size', { value: 1 })
    userEvent.upload(fileInput, file);
    waitFor(() => expect(getBase64).toHaveBeenCalledTimes(1));
    const cityDropdown = document.querySelector('.selectCity');
    userEvent.click(cityDropdown);
    userEvent.selectOptions(screen.getByTestId('testSelectCity'), ['Seattle']);
    clickDoneButton();
    const db = new MockDatabase();
    const postListRef = new MockRef(db, 'orgs');
    expect(postListRef.push()).toHaveBeenCalledTimes(1);
  })
})

function clickDoneButton() {
  const doneButton = document.querySelector('.registerOrgButton');
  userEvent.click(doneButton);
}

function typeInput(input, placeholderText) {
  const formInput = screen.getByPlaceholderText(placeholderText);
  userEvent.type(formInput, input);
}