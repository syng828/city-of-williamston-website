This website is modeled after the City of Williamston's website and has been redesigned with some new features (Contact Us Form, Login System, and Permit Submission)

Explanation 
- Any user who accesses the website can view basic information and send a Contact Us form request. However, they must create an account to send a permit request. This permit request is stored in a CRM database to mock sending the information to staff.

Technical Concepts 
- React JS: Used to handle interactions for the frontend of the website
- Python Django: Used to store user data for the backend, and also handles external APIS
    - Upon logging in, an access token will be created for the user which helps identify the specific permit request they have submitted to be fetched.
    - External API Used: Mailtrap for the Contact Us Form, Zoho CRM to store permits
- The client and server are connected through REST API endpoints.

![image](https://github.com/syng828/city-of-williamston-website/assets/117144719/24a9da1b-13ec-4200-b304-f28868f47fc6)
![image](https://github.com/syng828/city-of-williamston-website/assets/117144719/c5a5a0c2-044e-45eb-9065-353158e94344)
