from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EmployeeViewSet, AttendanceViewSet, home

router = DefaultRouter()
router.register(r'employees', EmployeeViewSet, basename='employee')
router.register(r'attendance', AttendanceViewSet, basename='attendance')

urlpatterns = [
    path('api/', include(router.urls)),  # API endpoints
    path('', home),                      # Root URL
]
