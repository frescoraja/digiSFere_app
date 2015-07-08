class SiteController < ApplicationController
  before_action :require_user!, only: [:main]
  def main
    render :main
  end

  def home
    render :home
  end
end
