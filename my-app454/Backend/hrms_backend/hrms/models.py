from djongo import models
from bson import ObjectId


class Employee(models.Model):
    _id = models.ObjectIdField(
        primary_key=True, default=ObjectId, editable=False)
    employeeId = models.CharField(max_length=20, unique=True)
    fullName = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    department = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.employeeId} - {self.fullName}"


class Attendance(models.Model):

    _id = models.ObjectIdField(
        primary_key=True, default=ObjectId, editable=False)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    date = models.DateField()
    status = models.CharField(max_length=10, choices=[
        ("Present", "Present"),
        ("Absent", "Absent")
    ])

    class Meta:
        unique_together = ('employee', 'date')

    def __str__(self):
        return f"{self.employee.employeeId} - {self.date} - {self.status}"
