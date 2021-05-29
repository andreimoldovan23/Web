$(document).ready(function () {
      $("#grades").hide();
      let studentId = localStorage.getItem("userId");

      $.ajax({
        dataType: "json",
        type: "GET",
        url: "http://localhost:8081/Homework/FacultyManagement/api/student.php",
        data: {id: studentId},
        success: function(data) {
            $("#name").text(data.name);
            $("#mail").text(data.mail);
            $("#group").text(data.groupNo);
        }
      });

      $.ajax({
          dataType: "json",
          type: "GET",
          url: "http://localhost:8081/Homework/FacultyManagement/api/grades.php",
          data: {id: studentId},
          success: renderTable
      })

      $("#logout").click(function() {
          localStorage.removeItem("userId");
          window.location.replace("http://localhost:8081/Homework/FacultyManagement/login.html");
      })

      function renderTable(data) {
        let trHTML = '';
        $.each(data, function (i, item) {
          trHTML += '<tr><td>' + item.courseName + '</td><td>' + item.grade + '</td><td>'
              + item.type + '</td></tr>';
        });

        $('#grades').append(trHTML);
        $('#grades').show();
      }
});
