from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Employee, Attendance
from .serializers import EmployeeSerializer, AttendanceSerializer


# Home page
def home(request):
    return HttpResponse("Welcome to HRMS Home Page")


# Employee CRUD
class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    lookup_field = 'employeeId'  # Use employeeId instead of ObjectId

    def get_object(self):
        emp_id = self.kwargs.get('employeeId')
        return get_object_or_404(self.queryset, employeeId=emp_id)

    def create(self, request, *args, **kwargs):
        if Employee.objects.filter(employeeId=request.data.get("employeeId")).exists():
            return Response({"error": "Employee ID already exists"}, status=status.HTTP_409_CONFLICT)
        return super().create(request, *args, **kwargs)


# Attendance CRUD
class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    lookup_field = 'employeeId'  # Look up by EmployeeId

    def destroy(self, request, *args, **kwargs):
        emp_id = self.kwargs.get('employeeId')
        employee = get_object_or_404(Employee, employeeId=emp_id)
        deleted_count = Attendance.objects.filter(
            employee=employee).delete()[0]
        return Response(
            {"detail": f"{deleted_count} attendance record(s) for {emp_id} deleted"},
            status=status.HTTP_204_NO_CONTENT
        )
