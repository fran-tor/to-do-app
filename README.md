# To Do app

This project is an application to manage tasks, the user can create, edit and delete them. The app allows the user to filter the tasks by name, priority and state (done or undone), in addition to sort by priority or due date. It also has a metrics section where the user can see the average time between the creation and done date of all the tasks and also by priority.

![Screenshot](/assets/Screenshot.png)

## Getting started

1. Clone the repositoy.

Using HTTPS:

```bash
git clone https://github.com/fran-tor/to-do-app.git
```

Using SSH:

```bash
git clone git@github.com:fran-tor/to-do-app.git
```

2. Move to the backend directory.

```bash
cd to-do-app/backend/
```

3. Run the backend

```bash
./mvnw spring-boot:run
```

4. Move to the frontend directory (Using a different terminal session).

```bash
cd ../frontend
```

5. Run the frontend

```bash
npm run start
```

## The Project Functional Requirements

You are working with a client that needs to implement a to do list to help manage their tasks in their daily job. The client asked you to implement the following functionality:

- [x] Create a “to do” specifying the name, a priority, and possibly a due date Ability to edit name, priority and due date for existing “to do” tasks 
- [x] They want to be able to specify a due date or clear the due date (because they are not interested in when to finish that “to do”) 
- [x] Be able to filter “to do’s” specifying the name (or part of the name), and the priority, and if they are done/undone.
- [x] Be able to sort the “to do’s” by priority and/or due date. For example, be able to sort items where their due date is soon and sort them also by priority to see what tasks are more urgent or less urgent 
- [x] Mark “to do’s” as done (clicking in a checkbox) or to undone a “to do” The undone functionality is just there if there is a mistake :D 
- [x] Since it is possible that the client will have a lot of “to do’s” they need to paginate the list of “to do’s”.
- [x] Ability to know, in average, the time between creation and done for all “to do’s”. This should be shown in general for all done “to do’s” and also grouped by priority. This is important for the client since this is a metric they follow to measure performance. 

## Technical Requirements

### UI Requirements

The UX/UI Team of the client is asking you to conform with the following markup to design the app.

- [x] Search/Filtering Controls.
- [x] New To Do Button. This should open a modal to type the “to do” data.
- [x] Priority column should show in the header the classic up and down arrows to allow the user to sort.
- [x] Due date column should show in the header the classic up and own arrows to allow the user to sort.
- [x] Action column to show actions (links/buttons) to allow the user to delete or edit a “to do” To Edit is ok to show a modal similar to the one to create a “to do”.
- [x] Pagination control. Showing the pages, its number and the next and previous page is enough. 
- [x] Area to show the metrics 

### Nice to have for the UI

- [ ] Show the row with background colors depending on the due date:
	- [ ] No due date – No background color One week between due date and today – Red background color.
	- [ ] 2 weeks between due date and today – Yellow background color.
	- [ ] More that 2 weeks between due date and today – Green background color 
- [ ] Strikethrough fonts for those tasks marked as done 

## Engineering Requirements

The Engineering team of the client is asking you to implement the functionality using the following recommendations:

### Model

A “to do” should have the following properties:

- [x] Id. This could be a number or string or a combination. Must be unique. 
- [x] Text (required). Max length is 120 chars.
- [x] A due date (optional). 
- [x] Done/undone flag.
- [x] A done date. When the “to do” is marked as done this date is set 
- [x] Priority (required). Options: High, Medium and Low.
- [x] Creation date. 

### API

- [x] A GET endpoint (/todos) to list “to do’s”.
	- [x] Include pagination. Pages should be of 10 elements.
	- [x] Sort by priority and/or due date.
	- [x] Filter by done/undone.
	- [x] Filter by the name or part of the name.
	- [x] Filter by priority.
- [x] **A POST endpoint (/to**dos) to create “to do’s”.
	- [x] Validations included.
- [x] **A PUT endpoint (/**todos/{id}) to update the “to do” name, due date and/or priority 
	- [ ] Valid**ations include**d.
- [ ] A POST endpoint (/todos/{id}/done) to **mark “to do” as** done.
	- [ ] This should update the “done date” property.
	- [ ] If “**to do” i**s already done nothing should happen (no error retur**ned)** 
- [ ] **A** PUT endpoint (/todos/{id}/undone) to mark “to do” as **undone If “to d**o” is already undone nothing should happen.
	- [ ] If “to do” is done, **this sh**ould clear the done date

> [!IMPORTANT]  
> The project does not have a POST endpoint to set the tasks as done or undone, it uses the PUT endpoint for that porpuse instead.

### Database

No need to use a database by **now, storing** data could be in memory using Java Collections (no in-memory **databases li**ke H2) and it is ok if data is lost when the applicat**ion is shutdown.** But they are asking you to design the persistent layer such that it will be somehow easy to switch from in-memory implementation to a database implementation (they are planning to implement the database implementation later).

### Git Repositories

You can use the same repository for the backend and the frontend. Just take care of: 

- Main branch should be ready for production always.
- You can have all the branches you need. 

#### Front-end Technology

For the front-end project, you have to use:

- Typescript 
- ReactJS
- Up to you to use Redux or React Context 

They need at least the following commands to run the project:

- [x] npm run start – To run the front-end application.
- [x] npm run tests – To run all tests in the front-end application.
- [x] Front end project must run in port 8080.

Add a README

Back-end Technology

For the back-end project, you have to use:

-  Java Maven
-  Spring Boot 

They need at least the following commands to run the project:

- [x] mvn spring-boot:run – To run the back-end application.
- [x] mvn test – To run all tests in the back-end application.
- [x] Back-end project must run in port 9090.
