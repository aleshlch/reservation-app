## Restaurant reservation app

This is a single page application for booking.  Enter the user's personal account by registering or logging into an existing profile. After that, information about current reservations will be available with the ability to edit and delete. If there is one hour left before the start of the booking time, then the possibility of editing and deleting disappears. The reservation is archived after the start of the booking time. When creating a new booking, you must select a date (where is made the custom calendar), time, table and, if necessary, specify a comment. A table may not be available for selection if there is already a reservation in the database for that time. It is also possible to edit the user profile, where you can change the name, email and password. For state is using Redux toolkit with createSlice and createAsyncThunk. Authentication and database made using Firebase.



