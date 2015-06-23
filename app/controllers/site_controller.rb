class SiteController < ApplicationController
  before_action :require_user!, only: [:root]
  def root
    render :root
  end

  def home
    render :home
  end
end