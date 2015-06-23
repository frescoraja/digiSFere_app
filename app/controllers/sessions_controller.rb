class SessionsController < ApplicationController
  before_action :require_user!, only: [:destroy]
  def new
    @user = User.new
  end

  def create
    @user = User.find_by_credentials(
              params[:user][:username],
              params[:user][:password])
    if @user
      sign_in(@user)
      redirect_to root_url
    else
      flash.now[:errors] = ["Invalid Username or password"]
      redirect_to home_url
    end
  end

  def destroy
    sign_out
    redirect_to home_url
  end
end
