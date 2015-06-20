class SiteController < ApplicationController
  before_action :require_user!, only: [:root]
  def root
    render :root
  end

  def welcome
    render :welcome
  end
end
