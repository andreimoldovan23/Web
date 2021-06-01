$(document).ready(function () {
    $("#groups").hide();
    $("#students").hide();
    $("#goLeft").hide();
    $("#goRight").hide();

    let students;
    let current = 0;

    $.ajax({
      dataType: "json",
      type: "GET",
      url: "http://localhost:8081/Homework/FacultyManagement/api/teacher.php",
      xhrFields: {
        withCredentials: true
      },
      success: function(data) {
          $("#name").text(data.name);
          $("#mail").text(data.mail);
          $("#site").text(data.site);
          $("#rank").text(data.rank);
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
      url: "http://localhost:8081/Homework/FacultyManagement/api/groups.php",
      xhrFields: {
        withCredentials: true
      },
      success: function(data) {
        renderGroups(data);
        $('.groupNumbers').click(groupSelectEventHandler);
      },
      error: function(jqXhr) {
        if (jqXhr.status === 401) {
          window.location.replace("http://localhost:8081/Homework/FacultyManagement/login.html");
        } else {
          window.location.replace("http://localhost:8081/Homework/FacultyManagement/error.html");
        }
      }
    });

    $(".studentName").click(studentSelectEventHandler);

    $("#addButton").click(function() {
        let sid = $("#sid").text();
        let cid = $("#cid").text();
        let grade = $("#gradeAdd").val();
        $("#gradeAdd").val("");
        $.ajax({
            type: "POST",
            url: "http://localhost:8081/Homework/FacultyManagement/api/grade_add.php",
            data: {sid: sid, cid: cid, grade: grade},
            xhrFields: {
              withCredentials: true
            },
            error: function(jqXhr) {
                if (jqXhr.status === 401) {
                  window.location.replace("http://localhost:8081/Homework/FacultyManagement/login.html");
                } else {
                  window.location.replace("http://localhost:8081/Homework/FacultyManagement/error.html");
                }
            }
        });
    });

    $(".close").click(function() {
        $(".gradeItem").remove();
        $("#myModal").hide();
    });

    $("#goLeft").click(function () {
        if (current > 0) goPrevious();
    });

    $("#goRight").click(function() {
        if (current < students.length) goNext();
    });

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
    });

    function fillEmptyRows(row) {
        while(row < 5) {
            $("#students tr:eq(" + row + ") td:eq(0) a").text("");
            $("#students tr:eq(" + row + ") td:eq(1)").text("");
            $("#students tr:eq(" + row + ") td:eq(2)").text("");
            $("#students tr:eq(" + row + ") td:eq(3)").text("");
            row += 1;
        }
    }

    function goNext() {
        let row = 1;
        while(current < students.length) { 
            let item = students[current];
            $("#students tr:eq(" + row + ") td:eq(0) a").text(item.studentName);
            $("#students tr:eq(" + row + ") td:eq(1)").text(item.course);
            $("#students tr:eq(" + row + ") td:eq(2)").text(item.sid);
            $("#students tr:eq(" + row + ") td:eq(3)").text(item.cid);
            current += 1;
            row += 1;
            if(current % 4 == 0) break;
        }
        fillEmptyRows(row);
    }

    function goPrevious() {
        current = (current >= 8) ? current - 8 : 0;
        goNext();
    }

    function renderGrades(data) {
        let trHTML = '';
        data.forEach(element => {
                    trHTML += '<li class="gradeItem"><input type="text" value="' + element.grade + '"><button class="updateButton">Update</button>';
                    trHTML += '<span class="secret">' + element.enrolId + '</span>'; 
                    trHTML += '</li>';
                });
        $(".studentGrades").append(trHTML);
        $("#myModal").show();
    }

    function renderGroups(data) {
        let trHTML = '';
        data.forEach(element => {
           trHTML += '<a class="groupNumbers" href="#">' + element.group + '</a> | '; 
        });
        $("#groups").append(trHTML);
        $("#groups").show();
    }

    function groupSelectEventHandler (event) {
        event.preventDefault();
        let targetName = event.target.text;
        $.ajax({
            dataType: "json",
            type: "GET",
            url: "http://localhost:8081/Homework/FacultyManagement/api/students.php",
            xhrFields: {
              withCredentials: true
            },
            data: {group: targetName},
            success: function(data) {
                $("#students").show();
                $("#goLeft").show();
                $("#goRight").show();
                let row = 1;
                current = 0;
                fillEmptyRows(row);
                students = data;
                goNext();
            },
            error: function(jqXhr) {
                if (jqXhr.status === 401) {
                  window.location.replace("http://localhost:8081/Homework/FacultyManagement/login.html");
                } else {
                  window.location.replace("http://localhost:8081/Homework/FacultyManagement/error.html");
                }
            }
        })
    }

    function studentSelectEventHandler (event) {
        event.preventDefault();
        let sid = event.target.parentElement.parentElement.children[2].innerText;
        let cid = event.target.parentElement.parentElement.children[3].innerText;

        $("#sid").text(sid);
        $("#cid").text(cid);
        
        $.ajax({
            dataType: "json",
            type: "GET",
            url: "http://localhost:8081/Homework/FacultyManagement/api/student_grades.php",
            xhrFields: {
              withCredentials: true
            },
            data: {sid: sid, cid: cid},
            success: function(data) {
                renderGrades(data);
                $(".updateButton").click(updateEventHandler);
            },
            error: function(jqXhr) {
                if (jqXhr.status === 401) {
                  window.location.replace("http://localhost:8081/Homework/FacultyManagement/login.html");
                } else {
                  window.location.replace("http://localhost:8081/Homework/FacultyManagement/error.html");
                }
            }
        });
    }

    function updateEventHandler (event) {
        let enrolId = event.target.parentElement.children[2].innerText;
        let grade = event.target.parentElement.children[0].value;
        
        $.ajax({
            type: "POST",
            url: "http://localhost:8081/Homework/FacultyManagement/api/grade_update.php",
            xhrFields: {
              withCredentials: true
            },
            data: {enrolId: enrolId, grade: grade},
            error: function(jqXhr) {
                if (jqXhr.status === 401) {
                  window.location.replace("http://localhost:8081/Homework/FacultyManagement/login.html");
                } else {
                  window.location.replace("http://localhost:8081/Homework/FacultyManagement/error.html");
                }
            }
        });
    }

});