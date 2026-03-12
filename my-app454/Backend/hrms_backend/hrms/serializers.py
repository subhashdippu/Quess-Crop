from rest_framework import serializers
from .models import Employee, Attendance


class EmployeeSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()  # string version of ObjectId

    class Meta:
        model = Employee
        fields = ['id', 'employeeId', 'fullName', 'email', 'department']

    def get_id(self, obj):
        return str(obj._id)


class AttendanceSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    employee = serializers.SlugRelatedField(
        queryset=Employee.objects.all(),
        slug_field='_id'
    )

    class Meta:
        model = Attendance
        fields = ['id', 'employee', 'date', 'status']

    def get_id(self, obj):
        return str(obj._id)
