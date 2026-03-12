from .models import Attendance, Employee
from rest_framework import serializers
from .models import Employee, Attendance


class EmployeeSerializer(serializers.ModelSerializer):
    id = serializers.CharField(
        source='_id', read_only=True)  # Map ObjectId to id

    class Meta:
        model = Employee
        fields = ['id', 'employeeId', 'fullName', 'email', 'department']


class AttendanceSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    employeeId = serializers.CharField(write_only=True)
    employee = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Attendance
        fields = ["id", "employee", "employeeId", "date", "status"]

    def get_id(self, obj):
        return str(obj._id)

    def get_employee(self, obj):
        return f"{obj.employee.employeeId} - {obj.employee.fullName}"

    def create(self, validated_data):
        emp_id = validated_data.pop("employeeId")

        employee = Employee.objects.get(employeeId=emp_id)

        attendance = Attendance.objects.create(
            employee=employee,
            **validated_data
        )

        return attendance
