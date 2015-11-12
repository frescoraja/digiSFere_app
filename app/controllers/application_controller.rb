class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_filter :expire_hosts
  helper_method :current_user, :require_user!

  def current_user
    return nil unless session[:session_token]
    current_session = Session.find_by_session_token(session[:session_token])
    @current_user = current_session.nil? ? nil : User.find(current_session.user_id)
  end

  def require_user!
    redirect_to home_url unless current_user
  end

  private
  def sign_in(user)
    @current_user = user
    session[:session_token] = user.add_token!
  end

  def sign_out
    current_user.try(:remove_token, session[:session_token])
    session[:session_token] = nil
  end

  def expire_hosts
    response.headers["Strict-Transport-Security"] = 'max-age=0'
  end
end
