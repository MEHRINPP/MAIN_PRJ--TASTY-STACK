from django.urls import path
from .views import RegisterView,LoginView,FavoriteToggleView,FavoriteListView
urlpatterns =[
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('favorites/toggle/', FavoriteToggleView.as_view()),
    path('favorites/', FavoriteListView.as_view()),
]