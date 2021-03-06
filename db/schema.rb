# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150807054754) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "listings", force: :cascade do |t|
    t.string   "title",      null: false
    t.text     "about",      null: false
    t.string   "address",    null: false
    t.float    "longitude"
    t.float    "latitude"
    t.string   "img_url"
    t.string   "website"
    t.integer  "category",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "listings", ["about"], name: "index_listings_on_about", using: :btree
  add_index "listings", ["address"], name: "index_listings_on_address", using: :btree
  add_index "listings", ["category"], name: "index_listings_on_category", using: :btree
  add_index "listings", ["longitude", "latitude"], name: "index_listings_on_longitude_and_latitude", using: :btree
  add_index "listings", ["title"], name: "index_listings_on_title", using: :btree

  create_table "sessions", force: :cascade do |t|
    t.string   "session_token", null: false
    t.integer  "user_id",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "sessions", ["session_token"], name: "index_sessions_on_session_token", using: :btree
  add_index "sessions", ["user_id"], name: "index_sessions_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
