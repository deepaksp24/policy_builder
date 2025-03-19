const finalFiledValue = {
  updateDisabled: false,
  rebootAfterUpdate: false,
  autoUpdateAllowedConnectionType:
    "AUTO_UPDATE_CONNECTION_TYPE_ENUM_WIFI_AND_ETHERNET",
  deviceRollbackToTargetVersion:
    "ROLLBACK_TO_TARGET_VERSION_ENUM_ROLLBACK_AND_RESTORE_IF_POSSIBLE",
  autoUpdateHttpDownloadsEnabled: false,
  releaseChannelWithLts: "RELEASE_CHANNEL_WITH_LTS_ENUM_STABLE_CHANNEL",
  deviceAutoUpdatePeerToPeerEnabled: true,
  deviceExtendedAutoUpdateEnabled: false,
  wilcoScheduledUpdateEnabled: false,
  wilcoScheduledUpdateFrequency: "WILCO_UPDATE_FREQUENCY_ENUM_DAILY",
  wilcoScheduledUpdateDayOfWeek: "WEEK_DAY_ENUM_MONDAY",
  deviceVariationsEnabled: "DEVICE_VARIATIONS_LEVEL_ENUM_ENABLED",
  plan: "SCHEDULE_UPDATES",
  stages: [
    {
      days: "22",
      percentage: "1",
    },
    {
      days: "33",
      percentage: "62",
    },
  ],
  timeRestriction: [
    {
      dayOfWeek: "FRIDAY",
      hours: "14",
      minutes: "30",
    },
    {
      dayOfWeek: "SATURDAY",
      hours: "13",
      minutes: "15",
    },
  ],
};

const savedData = {
  "Auto-update settings.": {
    updateDisabled: false,
    rebootAfterUpdate: false,
    autoUpdateAllowedConnectionType:
      "AUTO_UPDATE_CONNECTION_TYPE_ENUM_WIFI_AND_ETHERNET",
    deviceRollbackToTargetVersion:
      "ROLLBACK_TO_TARGET_VERSION_ENUM_ROLLBACK_AND_RESTORE_IF_POSSIBLE",
    autoUpdateRolloutPlan: {
      plan: "SCHEDULE_UPDATES",
      stages: [
        {
          days: "22",
          percentage: "1",
        },
        {
          days: "33",
          percentage: "62",
        },
      ],
    },
    autoUpdateTimeRestrictions: {
      timeRestriction: [
        {
          start: {
            dayOfWeek: "FRIDAY",
            hours: "14",
            minutes: "30",
          },
          end: {
            dayOfWeek: "FRIDAY",
            hours: "14",
            minutes: "30",
          },
        },
        {
          start: {
            dayOfWeek: "SATURDAY",
            hours: "13",
            minutes: "15",
          },
          end: {
            dayOfWeek: "SATURDAY",
            hours: "13",
            minutes: "15",
          },
        },
      ],
    },
    autoUpdateTargetVersionLts: {
      selectedVersion: {},
    },
    deviceMinimumVersion: {},
    autoUpdateHttpDownloadsEnabled: false,
    releaseChannelWithLts: "RELEASE_CHANNEL_WITH_LTS_ENUM_STABLE_CHANNEL",
    deviceAutoUpdatePeerToPeerEnabled: true,
  },
  "Extended auto-updates.": {
    deviceExtendedAutoUpdateEnabled: false,
  },
  "App-controlled updates.": {},
  "Scheduled updates.": {
    wilcoScheduledUpdateEnabled: false,
    wilcoScheduledUpdateFrequency: "WILCO_UPDATE_FREQUENCY_ENUM_DAILY",
    wilcoScheduledUpdateDayOfWeek: "WEEK_DAY_ENUM_MONDAY",
  },
  "Variations.": {
    deviceVariationsEnabled: "DEVICE_VARIATIONS_LEVEL_ENUM_ENABLED",
  },
};
