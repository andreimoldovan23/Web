$(document).ready(function () {
      $("#grades").hide();

      $.ajax({
        dataType: "json",
        type: "GET",
        url: "http://localhost:8081/Homework/FacultyManagement/api/student.php",
        xhrFields: {
          withCredentials: true
        },
        success: function(data) {
            $("#name").text(data.name);
            $("#mail").text(data.mail);
            $("#group").text(data.groupNo);
        },
        error: function(jqXhr) {
          if (jqXhr.status === 401) {
            window.location.replace("http://localhost:8081/Homework/FacultyManagement/login.html");
          } else {
            window.location.replace("http://localhost:8081/Homework/FacultyManagement/error.html");
          }
        }
      });

      $.ajax({
          dataType: "json",
          type: "GET",
          url: "http://localhost:8081/Homework/FacultyManagement/api/grades.php",
          xhrFields: {
            withCredentials: true
          },
          success: renderTable,
          error: function(jqXhr) {
            if (jqXhr.status === 401) {
              window.location.replace("http://localhost:8081/Homework/FacultyManagement/login.html");
            } else {
              window.location.replace("http://localhost:8081/Homework/FacultyManagement/error.html");
            }
          }
      })

      $("#logout").click(function() {
        $.ajax({
          type: "POST",
          url: "http://localhost:8081/Homework/FacultyManagement/api/logout.php",
          xhrFields: {
            withCredentials: true
          },
          success: function() {
            window.location.replace("http://localhost:8081/Homework/FacultyManagement/login.html");
          }
        }) 
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
