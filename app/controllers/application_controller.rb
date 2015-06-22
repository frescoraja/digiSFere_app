class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user, :require_user!

  def current_user
    return nil unless session[:session_token]
    @current_user = User.find_by_session_token(session[:session_token])
  end

  def require_user!
    unless current_user
      flash.now[:errors] = ["Must be logged in!"]
      redirect_to home_url
    end
  end

  private
  def sign_in(user)
    @current_user = user
    session[:session_token] = user.reset_session_token!
  end

  def sign_out
    current_user.try(:reset_session_token!)
    session[:session_token] = nil
  end
end
