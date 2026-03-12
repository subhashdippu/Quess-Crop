from rest_framework import serializers
from .models import Employee, Attendance


class EmployeeSerializer(serializers.ModelSerializer):
    id = serializers.CharField(
        source='_id', read_only=True)  # Map ObjectId to id

    class Meta:
        model = Employee
        fields = ['id', 'employeeId', 'fullName', 'email', 'department']


class AttendanceSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='_id', read_only=True)

    class Meta:
        model = Attendance
        fields = ['id', 'employee', 'date', 'status']
