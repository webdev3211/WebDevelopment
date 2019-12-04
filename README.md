Step Up Analytics

Database : MongoDB
Server : NodeJs
FrontEnd : ReactJs

::::::::::::::::::  Admin Side  ::::::::::::::::::
1. Admin login and signup 
    1.1 : Register 
    
            @route: '/admin/register/'
            Model : 
                name 
                email
                password
                phoneNo
                
    1.2 : Login
    
            @route : '/admin/login'
        
        
3. Courses
    3.1 - Add Courses : 
    
        3.1.1 @routes : '/admin/addCourse'
        
        3.1.2 Model : 
                    name
                    studentId
                    duration
                    startDate
                    endDate
                    venue
                    regLastDate
                    fee
                    desc
                    file 
                    

    3.2 - View All Courses
    
        3.2.1 @routes : '/admin/courses'
        


    3.3 - Edit Courses
    
        3.3.1 @route : '/admin/course/courseID'
        
    
4. Institute

    4.1 - View All Institutes :
    
        4.1.1 : @routes : '/admin/institutes'
        
                Send pageNo as a query 
                
                Eg - http//localhost:5000/admin/institutes?:pageno=1
                


    4.2 - Add Institute 
    
        4.2.1 : @routes : '/admin/addInstitute'
        
        4.2.2 : Model :
        
                        name
                        state
                        city
                        website
                        class
                        
    4.3 - get institute by id
    
        4.3.1 : @routes : '/admin/institute/instituteId'
        
    4.4 - get institute by name
    
        4.4.1 : @routes : '/admin/institute/InstituteName'
        
    4.5 - Remove Campus Ambassador 
    
        4.6.1 : @routes : '/admin/removeCampusAmbassador/instituteId'
        

5. Events

    5.1 - View All Events 
    
        5.1.1 : @routes : '/admin/events'
        
                send pageno as a query
                
    5.2 - Add an Event
    
        5.2.1 : @routes : '/admin/addEvent/instituteId'
        
    5.3 - Update an Event
    
        5.3.1 : @routes : '/admin/updateEvent/eventId'
        
    5.4 - Delete an Event 
    
        5.4.1 : @routes : '/admin/deleteEvent/eventId'
        




6. Registrations

    6.1 view all registrations
    
        6.2.1: @route : '/admin/registrations'
            send pageno as query
            
    6.2 View Registrations by date
    
        6.2.1: @route :   '/admin/registrationsbydate'
        
               -> send pagenumber query and dateBegin (format yyyy-mm-dd) and dateEnd (format yyyy-mm-dd) as query 
                ::: example :::
                http://localhost:3000/registrationsbydate?pageno=1&dateBegin=2019-11-19
                
               -> result will be the registrations after the date 'dateBegin' and Before the date 'dateEnd'
               
               
    6.3 View Registrations by course 
    
        6.3.1 @route : '/admin/registrationsbycourse'
        
              send pageno as query
                        
    6.4 View Registrations by Institute 
    
        6.4.1 @route : '/admin/registrationsbyinstitute'
                        send pageno as query
                        
    6.5 Add New Registration
    
        6.5.1 @route : '/admin/addRegistrations'
        6.5.2 Model : 
                    registrationInstitiute
                    studentId
                    courseId
                    paymentId
                    amount
                    institute

7. Student Controller

    7.1 Add Campus ambassador 
    
        7.1.1 @route  '/admin/users/profile/campusAmbassador/studentId'
    7.2 View all students 
    
        7.2.1   @route  '/admin/users'
    7.3 get user profile 
    
        7.3.1   @route "admin/users/profile/:id"
    7.4 Delete user 
    
        7.4.1    @route "admin/users/:id"
    7.5 Filter Students by Institute
    
        7.5.1    @route "/user/institute/all/:name"

8. Materials 

        8.1 Add Materials : 

                8.1.1 @route "admin/addMaterials"

                8.1.2 Model :
                        course : holds the course Id for reference
                        materialFile : array of filenames

        8.2 View Materials :

                @route : "admin/material"

        8.3 Download Material 
        
                @route :  "/downloadMaterial/:id"
        
        8.4 Delete Material 

                @route : "material/:id"

                
<----------:::::::::::::: Student ::::::::::::::---------->

1. Student Course enroll :
        
        @route "course/enroll/:id"

2. user 

    Register : 
            
            @route '/users/register'
            
    Login : 
            
            @route '/users/login'
            
    Get payload : 
    
            @route '/users/current'

3.  institute 

    3.1 register for a institute
    
            @route : '/institute/register'
    3.2 find institutes for student
    
            @route '/institute/register/find'
4. Profile 

    4.1 getUserProfile : 
    
            @route : '/profile/'
            
    4.2 Get all profile 
    
            @route : GET '/profile/all'
            
    4.3 get Profile by Handle
    
            @route : GET '/profile/handle/:handle'
            
    4.4 Get profile by userId
    
            @route : GET '/profile/user/:user_id'
            
    4.5 Edit PRofile :
    
            @route : POST '/profile/'
            
    4.6 Add Experience :
    
            @route : POST '/profile/experience'
            
    4.7 Add Education :
    
            @route : POST '/profile/education'
            
    4.8 Add projects :
    
            @route : POST '/profile/projects'
            
    4.9 Add Exam :
    
            @route : POST '/profile/exams'
                
    4.10 Add paper :    
    
            @route : POST '/profile/paper'
            
    4.11 Delete Education : 
    
            @route : DELETE '/profile/education/eduId'
            
    4.12 Delete Experience :
    
            @route : DELETE '/profile/experience/expID'
            
    4.13 Delete Project :
    
            @route : DELETE '/profile/projects/projectID'
            
    4.14 Delete Exams :
    
            @route : DELETE '/profile/exams/examId'
            
    4.15  Delete Papers :
    
            @route : DELETE '/profile/papers/paperId'
            
    4.16 Photo Upload PRofile 
    
            @route : POST '/profile/photoupload/'
           
                send Photo with name = file
                
    4.17 Delete Profile 
    
            @route : DELETE '/profile/'
