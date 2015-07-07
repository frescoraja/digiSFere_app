class SiteController < ApplicationController
  before_action :require_user!, only: [:root]
  def main
    render :main
  end

  def home
    render :home
  end
end
