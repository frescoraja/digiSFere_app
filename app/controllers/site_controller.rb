class SiteController < ApplicationController
  before_action :require_user!, only: [:main]
  def main
    render :main
  end

  def home
    @user = User.new
    render :home
  end
end
