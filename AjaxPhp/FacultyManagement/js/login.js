$(document).ready(function () {
    $("#form").submit(function (event) {
      event.preventDefault();
      let username = $("#user").val();
      let pwd = $("#pwd").val();
      let check = $("#checkMe").is(":checked");

      $.ajax({
        type: "POST",
        url: "http://localhost:8081/Homework/FacultyManagement/api/login.php",
        data: {name: username, password: pwd, isTeacher: check},
        success: function() {
            if(check)
                window.location.replace("http://localhost:8081/Homework/FacultyManagement/teacher_page.html");
            else
                window.location.replace("http://localhost:8081/Homework/FacultyManagement/student_page.html");
        },
        error: function() {
            window.location.href = "http://localhost:8081/Homework/FacultyManagement/error.html"
        }
      });
    });

  });