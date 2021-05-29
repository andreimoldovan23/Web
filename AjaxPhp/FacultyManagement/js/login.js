$(document).ready(function () {
    $("#form").submit(function (event) {
      event.preventDefault();
      let username = $("#user").val();
      let pwd = $("#pwd").val();
      let check = $("#checkMe").is(":checked");

      $.ajax({
        dataType: "json",
        type: "GET",
        url: "http://localhost:8081/Homework/FacultyManagement/api/login.php",
        data: {name: username, password: pwd, isTeacher: check},
        success: function(data) {
            if(data == null) {
                window.location.href = "http://localhost:8081/Homework/FacultyManagement/error.html"
                return;
            }
            localStorage.setItem("userId", data);
            if(check)
                window.location.replace("http://localhost:8081/Homework/FacultyManagement/teacher_page.html");
            else
                window.location.replace("http://localhost:8081/Homework/FacultyManagement/student_page.html");
        }
      });
    });

  });